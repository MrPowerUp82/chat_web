from .models import User, Msg, Friend,Invite
from rest_framework import serializers


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
		fields=('id','username','password','nome_chat')

	def save(self, **kwargs):
		user = User(username=self.validated_data['username'])
		password=(self.validated_data['password'])
		user.is_active = True
		user.set_password(password)
		user.save()


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