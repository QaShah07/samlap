# backend/backend/urls.py
from django.contrib import admin
# from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# for handling issue
from django.urls import path, include
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/team/', include('team.urls')),
    path('api/mpc/', include('mpc.urls')),
    path('api/explorer/', include('explorer.urls')),
    path('api/ourworks/', include('ourworks.urls')),
    path('api/outreach/', include('outreach.urls')),
    path("api/contact/", include("contact.urls")),
    path("api/downloads/", include("downloads.urls")),
    path("api/resources/", include("resources.urls")),
    path("api/mpc/", include("mpcDecision.urls")),
    path("api/mpcVoting/", include("mpcVoting.urls")),
    path("api/minutesAnalysis/", include("minutesAnalysis.urls")),
    path("api/mpcDiscussions/", include("mpcDiscussions.urls")),
    # for handling issue
    # re_path(r'^.*', TemplateView.as_view(template_name="index.html")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)