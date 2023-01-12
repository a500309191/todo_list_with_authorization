from django.shortcuts import render
from rest_framework import generics, views, permissions
from rest_framework.response import Response
from todo_list.models import Task, User
from todo_list import serializers



class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    # permission_classes = [permissions.IsAuthenticated, IsOwner]
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)


class TaskListView(generics.CreateAPIView):
    # queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)


class UserView(views.APIView):
    def get(self, request, format=None):
        user = User.objects.get(id=request.user.id)
        serializer = serializers.UserSerializer(user, many=False)
        return Response(serializer.data)