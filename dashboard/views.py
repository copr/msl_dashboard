import dashboard.models as models
import dashboard.form as f
from django.core import serializers
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.safestring import mark_safe
import json
import operator

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

def app(request):
    return render(request, "react.html")

## Api 
def api_send_data(request):
    results = models.Msl.objects.all()
    js_data = serializers.serialize("json",results)
    return HttpResponse(js_data, content_type='application/json')

# Serializers serializuji jen tridy co dedi z models.model, takze
# na jednoduche typy pouzivam json.dumps
def api_send_years(request):
    years = list(models.Msl.objects.values_list('rok', flat=True).distinct())
    js_data = json.dumps(years)
    return HttpResponse(js_data, content_type='application/json')

def api_send_teams(request):
    teams = list(models.Msl.objects.values_list("tym", flat=True).distinct())
    js_data = json.dumps(teams)
    return HttpResponse(js_data, content_type='application/json')

def api_send_places(request):
    places = list(models.Msl.objects.values_list("misto", flat=True).distinct())
    js_data = json.dumps(places)
    return HttpResponse(js_data, content_type='application/json')


# nekonzistentni pojmenovavani send/get
def api_filter(request):
    filt = dict(request.POST)
    data = models.Msl.objects.filter(rok__in=filt['years[]'],
                                    misto__in=filt['places[]'],
                                    tym__in=filt['teams[]'])
    js_data = serializers.serialize("json", data)
    return HttpResponse(js_data, content_type='application/json')

def api_get_teams_by_year(request, year):
    teams = sorted(list(models.Msl.objects.filter(rok=year)
                .values_list("tym", flat=True).distinct()))
    js_data = json.dumps(teams)
    return HttpResponse(js_data, content_type='application/json')

def api_get_years_by_team(request, team):
    years = sorted(list(models.Msl.objects.filter(tym=team)
                 .values_list("rok", flat=True).distinct()))
    js_data = json.dumps(years)
    return HttpResponse(js_data, content_type='application/json')

def api_get_races_by_team_year(request, team, year, category):
    races = sorted(models.Msl.objects.filter(tym=team, rok=year, kategorie=category),
                   key=operator.attrgetter('kolo'))
    js_data = serializers.serialize("json", races)
    return HttpResponse(js_data, content_type='application/json')
