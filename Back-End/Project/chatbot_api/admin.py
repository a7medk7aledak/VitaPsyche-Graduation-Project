from django.contrib import admin
from .models import ChatSession, Message, UnansweredQuestion

# Register your models here.
admin.site.register(ChatSession)
admin.site.register(Message)
admin.site.register(UnansweredQuestion)
