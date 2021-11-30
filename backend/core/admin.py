from django.contrib import admin
from .models import User, Msg, Invite, Friend

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id','username')\

@admin.register(Msg)
class MsgAdmin(admin.ModelAdmin):
    list_display = ('send_user_msg_id','recv_user_msg_id')

admin.site.register(Invite)
admin.site.register(Friend)