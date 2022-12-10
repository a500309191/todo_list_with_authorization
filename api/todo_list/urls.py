from django.urls import path
from todo_list import views 


urlpatterns = [
    path("tasks/<int:pk>", views.TaskDetailView.as_view()),
    path("tasks/", views.TaskListView.as_view()),
    # path("users/<int:pk>", views.UserDetailView.as_view()),
    # path("users/", views.UserListView.as_view()),
]