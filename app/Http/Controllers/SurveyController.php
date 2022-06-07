<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SurveyController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        return Survey::where('user_id', $user->id)->paginate();
    }


    public function store(Request $request)
    {
        $request->merge(['user_id'=> Auth::id()]);
        isset($request['status']) ? $request->merge(['status'=> 'inactive']): $request->merge(['status'=> $request['status']]);

        $data = $request->validate([
            'title'=>'required | string| max:1000',
            'image'=>'nullable|string',
            'user_id'=>'exists:users,id',
            'status'=>'required|string',
            'description'=>'nullable|string',
            'expire_date'=>'nullable|date|after:tomorrow',
            'questions'=>'array'
        ]);

        //check if image was sent
        if(isset($data['image'])){
            try {
                $relativePath = $this->saveImage($data['image']);
                $data['image'] = $relativePath;
            } catch (\Exception $e) {
                \Log::info($e->getMessage());
            }

        }
      $survey =  Survey::create($data);
        foreach($data['questions'] as $question){
            $question['survey_id'] = $survey->id;
            //validate questions
            $this->createQuestion($question);
        }
      return "Survey Created successfully";

    }

    public function createQuestion($question){
      try{
          if(is_array($question['data'])){
              $question['data'] = json_encode($question['data']);
          }
          $validator = Validator::make($question,[
              'question'=> 'required|string',
              'type'=> ['required',Rule::in(
                  [
                      Survey::TYPE_TEXT,
                      Survey::TYPE_TEXTAREA,
                      Survey::TYPE_RADIO,
                      Survey::TYPE_CHECKBOX,
                      Survey::TYPE_SELECT,
                  ]
              )],
              'description'=> 'nullable|string',
              'data'=>'present',
              'survey_id'=>'exists:App\Models\Survey,id'
          ]);
          return SurveyQuestion::query()->create($validator->validated());
      }catch (\Exception $exception){
          return $exception->getMessage();
      }
    }

    public function show($id, Request  $request)
    {
        $survey = Survey::where('id',$id)->with('questions')->first();
        $survey->image_url = $survey->image ? URL::to($survey->image) : null;

        if($request->user()->id !== $survey->user_id){
            return abort(403, 'unauthorized action');
        }
        return new SurveyResource($survey);
    }



    public function update(Request $request, $id)
    {

        //check if logged in user is the owner of the survey
        $survey = Survey::find($id)->first();

        if($survey->user_id !== Auth::id()){
            return "You are not permitted to perform this action!";
        }

        $data = $request->validate([
            'title'=>'required | string| max:1000',
            'image'=>'nullable|string',
            'user_id'=>'exists:users,id',
            'status'=>'required|boolean',
            'description'=>'nullable|string',
            'expire_date'=>'nullable|date|after:tomorrow',
            'questions'=>'present'
        ]);

//        // Check validation failure
//        if ($data->fails()) {
//            return $data->errors();
//        }

        //if image exists inside data
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image']= $relativePath;

            //if there is an old image , delete it
            if($survey->image){
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        if($survey->update($data)){

            $survey->image_url = $survey->image ? URL::to($survey->image) : null;

            //update questions

            //get ids as a plain array of existing questions
            $existingIds = $survey->questions()->pluck('id')->toArray();

            //get ids as a plain array of new questions
            $newIds = Arr::pluck($data['questions'],'id');

            //find questions to delete
            $toDelete = array_diff($existingIds, $newIds);

            //find questions to add
            $questionsToAdd = array_diff($newIds, $existingIds);

            //delete questions to delete array
            SurveyQuestion::destroy($toDelete);

            //create new questions
            foreach ($data['questions'] as $question){
                if(in_array($question['id'],$questionsToAdd)){
                    $question['survey_id'] = $survey->id;
                    $this->createQuestion($question);
                }
            }
            //update existing questions
            $questionsMap = collect($data['questions'])->keyBy('id');
            foreach($survey->questions as $question){
                if(isset($questionsMap[$question->id])){
                    $this->updateQuestion($question, $questionsMap[$question->id]);
                }

            }


            return new SurveyResource($survey);
        }else{
            return abort(500, 'error occurred updating survey');
        }
    }


    public function destroy(Survey $survey, Request $request)
    {
//        todo disable permanent deletion, implement temporary deleting
        if($request->user()->id !== $survey->user_id){
            return abort(403, 'unauthorized action');
        }
        if($survey->image){
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        $survey->delete();
        return response('Survey deleted successfully',204);
    }

    public function permanentlyDeleteSurvey($id){
        $survey = Survey::find($id);

        if(Auth::id() !== $survey->user_id){
            return abort(403, 'unauthorized action');
        }
        if($survey->image){
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        $survey->delete();
        return response('Survey deleted successfully',204);
    }

    /**
     * @throws \Exception
     */
    private function saveImage($image)
    {
        //check if image is valid base 64
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            //take out the base64 encoded text without meme type
            $image = substr($image, strpos($image,',')+1);

            //get file extension
            $type = strtolower($type[1]);

            //check if file is an image
            if(!in_array($type, ['jpg','jpeg','gif','png'])){
                throw new \Exception('invalid image type');
            }

            $image = str_replace(' ','+',$image);
            $image = base64_decode($image);

            if(!$image){
                throw new \Exception('base 64 decode failed');
            }

        }else
            throw new \Exception("did not match; not a valid image");

        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir.$file;

        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;

    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if(is_array($data['data'])){
            $data['data']= json_encode($data['data']);
        }
        $validator = Validator::make($data,[
            'id'=> 'exists:App\Models\SurveyQuestion,id',
            'question'=>'required|string',
            'type'=> ['required',Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
                Survey::TYPE_SELECT,
            ])],
            'description'=> 'nullable|string',
            'data'=>'present'
        ]);
        return $question->update($validator->validated());

    }
}
