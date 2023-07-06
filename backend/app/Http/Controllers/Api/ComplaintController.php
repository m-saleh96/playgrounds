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
    
    public function index()
    {
        $complaints = Complaint::all();
        $complaints->load('player', 'playground');
        $filteredComplaints = $complaints->map(function ($complaint) {
            return [
                'playground_id' => $complaint->playground_id,
                'player_id' => $complaint->user_id,
                'message' => $complaint->message,
                'player_name' => $complaint->player->name,
                'playground_name' => $complaint->playground->name,
                'playground_owner' => $complaint->playground->user->name,
            ];
        });
        
        return response()->json($filteredComplaints, 200);        
    }
    
}
