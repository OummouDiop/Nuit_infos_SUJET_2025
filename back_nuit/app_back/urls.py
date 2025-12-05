from django.urls import path
from . import views

app_name = 'app_back'

urlpatterns = [
    path('chat/', views.chat_interface, name='chat_interface'),
    path('api/chat/message/', views.chat_message, name='chat_message'),
    path('api/chat/history/<str:session_id>/', views.get_conversation_history, name='conversation_history'),
    path('api/test/models/', views.test_gemini_models, name='test_models'),
]