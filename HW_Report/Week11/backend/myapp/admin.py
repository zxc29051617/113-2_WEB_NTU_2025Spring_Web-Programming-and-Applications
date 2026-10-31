from django.contrib import admin

# Register your models here.

from myapp.models import student

# admin.site.register(student) # test only

class studentAdmin(admin.ModelAdmin):
    list_display=('id','cName','cSex','cBirthday','cEmail','cPhone',)
    list_filter=('cName',)
    search_fields=('cName','cEmail','cPhone',)
    ordering=('id','cName','cSex','cBirthday','cEmail','cPhone',)

admin.site.register(student, studentAdmin)
