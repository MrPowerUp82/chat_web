from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken, SlidingToken, UntypedToken

class User(AbstractUser):
    nome_chat=models.CharField(blank=True, max_length=255)



class Msg(models.Model):
    send_user_msg_id = models.ForeignKey('core.User', related_name='send_user_msg', on_delete=models.CASCADE)
    recv_user_msg_id = models.ForeignKey('core.User', related_name='recv_user_msg', on_delete=models.CASCADE)
    msg=models.TextField('msg')
    data = models.DateTimeField('data', auto_now_add=True)


class Invite(models.Model):
    send_user_id = models.ForeignKey('core.User', related_name='send_user', on_delete=models.CASCADE)
    recv_user_id = models.ForeignKey('core.User', related_name='recv_user', on_delete=models.CASCADE)
    send_username=models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    data = models.DateTimeField('data', auto_now_add=True)


class Friend(models.Model):
    user1_id = models.ForeignKey('core.User', related_name='user1_id', on_delete=models.CASCADE)
    user2_id = models.ForeignKey('core.User', related_name='user2_id', on_delete=models.CASCADE)