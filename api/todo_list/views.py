from django.shortcuts import render
from rest_framework import generics, permissions
from todo_list.models import Task, User
from todo_list import serializers



class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    # permission_classes = [permissions.IsAuthenticated, IsOwner]
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)


class TaskListView(generics.ListCreateAPIView):
    # queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)


# class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = serializers.UserSerializer
#     # permission_classes = [permissions.IsAuthenticated]


# class UserListView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = serializers.UserSerializer
#     # permission_classes = [permissions.IsAuthenticated]