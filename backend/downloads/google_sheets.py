import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from django.utils import timezone
from .models import DownloadSubmission

# 1) Google Sheets scopes
SCOPES = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
]

# 2) Path to service account JSON
SERVICE_ACCOUNT_FILE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "../credentials/google_service.json"
)

# 3) Sheet ID for download tracking
SHEET_ID = os.environ.get("GOOGLE_SHEET_ID_DOWNLOADS", "YOUR_SHEET_ID_HERE")

def append_download_to_sheet(submission: DownloadSubmission) -> None:
    """
    Append a new row for this download submission.
    Columns expected in the Sheet (in order):
      [Timestamp, Name, Email, User Type, Extra Info, Purpose, Comment,
       Resource Type, Resource Slug, Resource Name]
    """
    try:
        creds = ServiceAccountCredentials.from_json_keyfile_name(
            SERVICE_ACCOUNT_FILE, SCOPES
        )
        client = gspread.authorize(creds)
        sheet = client.open_by_key(SHEET_ID).sheet1

        timestamp = timezone.localtime(submission.submitted_on).strftime("%Y-%m-%d %H:%M:%S")

        # Extra Info based on user_type
        if submission.user_type == "student":
            extra_info = submission.institution_name
        elif submission.user_type == "professional":
            extra_info = submission.organization_name
        else:
            extra_info = submission.other_description

        row = [
            timestamp,
            submission.name,
            submission.email,
            submission.get_user_type_display(),
            extra_info,
            submission.get_purpose_of_contact_display(),
            submission.comment,
            submission.get_resource_type_display(),
            submission.resource_slug,
            submission.resource_name,
        ]

        sheet.append_row(row, value_input_option="USER_ENTERED")

    except Exception as e:
        # Log the error
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Failed to append download to Google Sheet: {e}")
