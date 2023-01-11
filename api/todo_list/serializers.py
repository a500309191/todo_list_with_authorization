from rest_framework import serializers
from todo_list.models import Task, User


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        exclude = "time_create", "time_update", "user"


class UserSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = "id", "email", "tasks", 



# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = 'id', 'email', 'password' 

#     def create(self, validated_data):
#         email = validated_data.pop('email')
#         password = validated_data.pop('password')

#         new_user = User(email=email)
#         new_user.is_active = True
#         new_user.set_password(password)
#         new_user.save()

#         return new_user
