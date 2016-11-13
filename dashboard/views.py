from django.shortcuts import render
import dashboard.models as models
import dashboard.form as f
from django.http import HttpResponseRedirect
from django.core import serializers
from django.utils.safestring import mark_safe

def index(request):
	return render(request, 'base.html', {})
	
def result(request):
	results = models.Msl.objects.all()
	return render(request, 'base.html', {'results':results})
	
def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = f.RokForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            print(form)
            p = models.Msl(rok = form.cleaned_data['rok'])
            p.save()
            # redirect to a new URL:
            return HttpResponseRedirect('/index/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = f.RokForm()

    return render(request, 'form.html', {'form': form})
	
def send_data(request):
    results = models.Msl.objects.all()
    js_data = mark_safe(serializers.serialize("json",results))
    return render(request, "dash2.html", {"msl_data": js_data})