import dashboard.models as models
import dashboard.form as f
from django.core import serializers
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.safestring import mark_safe

def index(request):
    return render(request, 'base.html', {})

def result(request):
    results = models.Msl.objects.all()
    return render(request, 'base.html', {'results':results})

def get_name(request):
    if request.method == 'POST':
        form = f.RokForm(request.POST)
        if form.is_valid():
            p = models.Msl(rok = form.cleaned_data['rok'])
            p.save()
            return HttpResponseRedirect('/index/')
    else:
        form = f.RokForm()
    return render(request, 'form.html', {'form': form})

def send_data(request):
    results = models.Msl.objects.all()
    js_data = mark_safe(serializers.serialize("json",results))
    return render(request, "dash2.html", {"msl_data": js_data})

def api_send_data(request):
    results = models.Msl.objects.all()
    js_data = serializers.serialize("json",results)
    return HttpResponse(js_data, content_type='application/json')

def app(request):
    return render(request, "react.html")
