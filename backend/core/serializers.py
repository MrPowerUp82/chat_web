from .models import User, Msg, Friend,Invite
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User as CUser
from django.contrib.auth.models import Group

class UserListSerializer(serializers.ModelSerializer):
	class Meta:
		model=User
		fields=('id','username','nome_chat')


class UserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(style={"input_type": 'password'}, required=True)

	class Meta:
		extra_kargs = {
			'password': {'write_only': True}
		}
		model=User
		fields=('id','username','email','password','nome_chat')

	def save(self, **kwargs):
		group = Group.objects.get(name='base')
		user = User(email=self.validated_data['email'],username=self.validated_data['username'])
		password=(self.validated_data['password'])
		user.is_active = True
		user.set_password(password)
		user.save()
		user.groups.add(group)


class MsgSerializer(serializers.ModelSerializer):
	class Meta:
		model=Msg
		fields=('id','send_user_msg_id','recv_user_msg_id','data','msg')


class InviteSerializer(serializers.ModelSerializer):
	class Meta:
		model=Invite
		fields=('id','send_user_id','recv_user_id','status','send_username')


class FriendSerializer(serializers.ModelSerializer):
	class Meta:
		model=Friend
		fields=('user1_id','user2_id')