<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;
use App\Models\User;
class ComplaintController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'userId' => 'required|exists:users,id',
            'playgroundId' => 'required|exists:playgrounds,id',
            'complaintMessage' => 'required|string',
            
        ]);
    
        $user = User::findOrFail($validatedData['userId']); 
    
        if ($user->role === 'player') {
            $complaint = Complaint::create([
                'user_id' => $validatedData['userId'],
                'playground_id' => $validatedData['playgroundId'],
                'message' => $validatedData['complaintMessage'],
            ]);
    
            return response()->json([
                'message' => 'Complaint submitted successfully.',
                'complaint' => $complaint,
            ]);
        }
    
        return response()->json([
            'message' => 'You are not allowed to send this complaint.',
        ], 403);
    }
    
    
}
