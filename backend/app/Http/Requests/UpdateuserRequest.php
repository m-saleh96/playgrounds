<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
class UpdateuserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    
    public function rules()
    {
        return [
            'name' => 'string',
            'email' => ['email', Rule::unique('users')->ignore($this->user)],
            'phone' => 'string|max:11',
            'role'=>'string',
        ];
    }


protected function failedValidation(Validator $validator)
{
throw new HttpResponseException(response()->json(
// 'errors' =>
 $validator->errors(),
// 'status' => true
 422));
}

}
