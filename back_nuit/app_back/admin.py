from django.contrib import admin
from .models import ChatConversation, ChatMessage

# Register your models here.

@admin.register(ChatConversation)
class ChatConversationAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'user', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['session_id', 'user__username']
    readonly_fields = ['created_at', 'updated_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['conversation', 'message_type', 'content_preview', 'timestamp']
    list_filter = ['message_type', 'timestamp']
    search_fields = ['content', 'conversation__session_id']
    readonly_fields = ['timestamp']
    
    def content_preview(self, obj):
        return obj.content[:100] + "..." if len(obj.content) > 100 else obj.content
    content_preview.short_description = 'Content Preview'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('conversation')
