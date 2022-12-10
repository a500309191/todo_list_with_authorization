from django.shortcuts import render
from rest_framework import generics, permissions
from todo_list.models import Task, User
from todo_list import serializers

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]


# class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = serializers.UserSerializer
#     # permission_classes = [permissions.IsAuthenticatUser

# class UserListView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = serializers.UserSerializer
#     # permission_classes = [permissions.IsAuthenticated]