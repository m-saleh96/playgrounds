<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Send a chat message.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    
    // public function sendMessage(Request $request)
    // {
    //     $request->validate([
    //         'sender_id' => 'required|exists:users,id',
    //         'receiver_id' => 'required|exists:users,id',
    //         'message' => 'required|string',
    //     ]);
    
    //     $sender = User::findOrFail($request->input('sender_id'));
    //     $receiver = User::findOrFail($request->input('receiver_id'));
    
    //     // Check if the sender is a player and the receiver is an owner
    //     if ($sender->role === 'player' && $receiver->role === 'owner') {
    //         $message = ChatMessage::create([
    //             'sender_id' => $sender->id,
    //             'receiver_id' => $receiver->id,
    //             'message' => $request->input('message'),
    //         ]);
    
    //         return response()->json([
    //             'message' => 'Message sent successfully',
    //             'data' => $message,
    //         ]);
    //     }
    
    //     return response()->json([
    //         'message' => 'You are not allowed to start a chat with this user',
    //     ], 403);
    // }
    

    public function sendMessage(Request $request)
{
    $request->validate([
        'sender_id' => 'required|exists:users,id',
        'receiver_id' => 'required|exists:users,id',
        'message' => 'required|string',
    ]);

    $sender = User::findOrFail($request->input('sender_id'));
    $receiver = User::findOrFail($request->input('receiver_id'));

    // Check if there is an existing chat between the owner and player
    $existingChat = ChatMessage::where('sender_id', $sender->id)
                               ->where('receiver_id', $receiver->id)
                               ->orWhere('sender_id', $receiver->id)
                               ->where('receiver_id', $sender->id)
                               ->exists();

    // Check if the sender is an owner or a player
    if ($sender->role === 'player' && $receiver->role === 'owner') {
        // player can always send a message
        $message = ChatMessage::create([
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'message' => $request->input('message'),
        ]);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message,
        ]);
    } elseif ($sender->role === 'owner' && $receiver->role === 'player' && $existingChat) {
        // Player can send a message if there is an existing chat
        $message = ChatMessage::create([
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'message' => $request->input('message'),
        ]);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message,
        ]);
    }

    return response()->json([
        'message' => 'You are not allowed to start a chat with this user',
    ], 403);
}





    /**
     * Get the chat messages between a sender and receiver.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getChatMessages(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
        ]);

        $senderId = $request->input('sender_id');
        $receiverId = $request->input('receiver_id');

        $messages = ChatMessage::where(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $senderId)->where('receiver_id', $receiverId);
        })->orWhere(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $receiverId)->where('receiver_id', $senderId);
        })->orderBy('created_at', 'asc')->get();

        return response()->json([
            'data' => $messages,
        ]);
    }
}
