<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'userId' => 'required|exists:users,id',
            'playgroundId' => 'required|exists:playgrounds,id',
            'complaintMessage' => 'required|string',
        ]);

        $user = $request->user();
        if (!$user || $user->role !== 'player') {
            return response()->json([
                'message' => 'Only authenticated players can send complaints.'
            ], 403);
        }

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
}
