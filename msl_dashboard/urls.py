"""msl_dashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from dashboard import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index/$', views.index),
    url(r'^result/$', views.result),
    url(r'^form/$', views.get_name),
    url(r'^dashboard/$', views.send_data),
    url(r'^api/data/$', views.api_send_data),
    url(r'^api/years/$', views.api_send_years),
    url(r'^api/teams/$', views.api_send_teams),
    url(r'^api/teamsbyyear/(?P<year>\d+)/$', views.api_get_teams_by_year),
    url(r'^api/yearsbyteam/(?P<team>[\w ]+)/$', views.api_get_years_by_team),
    url(r'^api/yearsbyteam/(?P<team>[\w ]+)/$', views.api_get_years_by_team),
    url(r'^api/races/(?P<team>[\w ]+)/(?P<year>\d+)/$',
        views.api_get_races_by_team_year),
    url(r'^app/$', views.app)
]
