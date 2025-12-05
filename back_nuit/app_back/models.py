from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ChatConversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Conversation {self.session_id} - {self.user.username if self.user else 'Anonymous'}"
    
    class Meta:
        ordering = ['-created_at']

class ChatMessage(models.Model):
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('bot', 'Bot'),
    ]
    
    conversation = models.ForeignKey(ChatConversation, on_delete=models.CASCADE, related_name='messages')
    message_type = models.CharField(max_length=4, choices=MESSAGE_TYPES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.message_type}: {self.content[:50]}..."
    
    class Meta:
        ordering = ['timestamp']
