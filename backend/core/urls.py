from django.urls import path
from .views import UsersView, MsgsBoxView, CreateMsgView, UserMsgView, UserGetIdView, UserListView, InviteView,FriendView, UserGetNameView, InviteGetView

urlpatterns=[
    path('users/',UsersView.as_view(),name='users'),
    path('user/',UserGetIdView.as_view(),name='user'),
    path('user/<int:pk>/',UserGetNameView.as_view(),name='user'),
    path('users/<int:pk>/',UserListView.as_view(),name='users_list'),
    path('msgs/',CreateMsgView.as_view(),name='msgs'),
    path('msgs/<int:pk>/<int:id_send>/',MsgsBoxView.as_view(),name='msgsbox'),
    path('invites/<int:pk>/',InviteGetView.as_view(),name='invites'),
    path('invites/',InviteView.as_view(),name='invites'),
    path('friends/<int:pk>/',FriendView.as_view(),name='friends'),
]