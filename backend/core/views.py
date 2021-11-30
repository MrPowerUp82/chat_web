import json
import django.core

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User,Msg,Invite, Friend
from .serializers import UserSerializer, MsgSerializer, UserListSerializer,InviteSerializer,FriendSerializer
from django.db.models import Q


class UserGetIdView(APIView):
    def get(self,request):
        id=request.user.id
        user = User.objects.filter(id=id)
        serializer = UserListSerializer(user, many=True)
        return Response(serializer.data)

class UsersView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        user = User.objects.all()
        serializer = UserListSerializer(user, many=True)
        return Response(serializer.data)

class UserGetNameView(APIView):
    def get(self, request, pk):
        user = User.objects.filter(id=pk)
        serializer = UserListSerializer(user, many=True)
        return Response(serializer.data)

class UserListView(APIView):
    def get(self, request, pk):
        users = User.objects.exclude(id=pk)
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)

class UserMsgView(APIView):
    def get(self, request, pk):
        user = User.objects.filter(id=pk)
        if not user:
            return Response({'error': 'não existe esse usuário'})
        serializer = UserListSerializer(user, many=True)
        return Response(serializer.data)


class MsgsBoxView(APIView):

    def get(self, request,pk,id_send):
        msgs = Msg.objects.filter(Q(send_user_msg_id=pk) & Q(recv_user_msg_id=id_send) | Q(send_user_msg_id=id_send) & Q(recv_user_msg_id=pk)).order_by('id')
        if not msgs:
            return Response({'error': ''})

        test_id = request.user.id
        test = Msg.objects.filter(Q(send_user_msg_id=test_id) | Q(recv_user_msg_id=test_id))
        if test.count() < 1:
            return Response({'error': 'você não tem permissão para ver...'})
        serializer = MsgSerializer(msgs, many=True)
        return Response(serializer.data)


class CreateMsgView(APIView):
    def post(self,request):
        serializer=MsgSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class InviteView(APIView):
    def post(self, request):
        serializers = InviteSerializer(data=request.data)
        test = Friend.objects.filter(
            Q(user1_id=request.data['send_user_id']) & Q(user2_id=request.data['recv_user_id']) | Q(
                user1_id=request.data['recv_user_id']) & Q(user2_id=request.data['send_user_id']))
        if test.count() >= 1:
            return Response({'error': 'Vcs ja sao amigos'})
        if (request.data['status']) == 1:
            if test.count() >= 1:
                return Response({'error': 'Vcs ja sao amigos'})
            else:
                friend = FriendSerializer(data={
                    'user1_id': request.data['send_user_id'],
                    'user2_id': request.data['recv_user_id']
                }
                )
                friend.is_valid(raise_exception=True)
                friend.save()
                invite = Invite.objects.get(id=request.data['id'])
                invite.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)

        if (Invite.objects.filter(Q(send_user_id=request.user.id) & Q(recv_user_id=request.data['recv_user_id'])).count() >= 1):
            return Response({'error': 'vc já mandou para esse user'})
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)


class InviteGetView(APIView):

    def delete(self, request,pk):
        invite = Invite.objects.filter(id=pk)
        invite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self,request,pk):
        invites = Invite.objects.filter(recv_user_id=pk)
        serializers = InviteSerializer(invites,many=True)
        return Response(serializers.data)

class FriendView(APIView):
    permission_classes = (AllowAny,)
    def get(self,request,pk):
        friends = Friend.objects.filter(Q(user1_id=pk) | Q(user2_id=pk)).values()
        lista=str(list(friends)).replace('[','').replace(']','').replace("'",'"')
        lista=eval(lista)
        users=[]
        try:
            for x in lista:
                if x['user1_id_id'] != pk:
                    users.append(User.objects.filter(id=x['user1_id_id']).values('id','username'))
                else:
                    users.append(User.objects.filter(id=x['user2_id_id']).values('id','username'))
        except:
            if lista['user1_id_id'] != pk:
                users.append(User.objects.filter(id=lista['user1_id_id']).values('id','username'))
            else:
                users.append(User.objects.filter(id=lista['user2_id_id']).values('id','username'))

        return Response(users)