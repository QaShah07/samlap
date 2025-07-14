import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from django.utils import timezone
from .models import ContactSubmission

# 1) Scopes for Google Sheets/Drive
SCOPES = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
]

# 2) Path to service account JSON (place your JSON under backend/credentials/google_service.json)
SERVICE_ACCOUNT_FILE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "../credentials/google_service.json"
)

# 3) Your Google Sheet ID
SHEET_ID = os.environ.get("GOOGLE_SHEET_ID", "YOUR_SHEET_ID_HERE")

def append_submission_to_sheet(submission: ContactSubmission) -> None:
    """
    Append a new row to the Google Sheet for this submission.
    The columns in the sheet should be in this order:
      [Timestamp, Name, Email, User Type, Extra Info, Purpose, Comment]
    Where Extra Info is:
      * Institution Name (if student)
      * Organization Name (if professional)
      * Other Description (if other)
    """
    try:
        creds = ServiceAccountCredentials.from_json_keyfile_name(
            SERVICE_ACCOUNT_FILE, SCOPES
        )
        client = gspread.authorize(creds)
        sheet = client.open_by_key(SHEET_ID).sheet1

        timestamp = timezone.localtime(submission.submitted_on).strftime("%Y-%m-%d %H:%M:%S")

        # Determine Extra Info column based on user_type
        if submission.user_type == "student":
            extra_info = submission.institution_name
        elif submission.user_type == "professional":
            extra_info = submission.organization_name
        else:  # "other"
            extra_info = submission.other_description

        row = [
            timestamp,
            submission.name,
            submission.email,
            submission.get_user_type_display(),  # "Student"/"Professional"/"Other"
            extra_info,
            submission.get_purpose_of_contact_display(),
            submission.comment,
        ]

        sheet.append_row(row, value_input_option="USER_ENTERED")

    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Google Sheets append failed: {e}")
