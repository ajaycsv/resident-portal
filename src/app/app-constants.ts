export const APPPOINTEMENT = {

    USER: 'user/',
    MISC_SERVICE: 'misc-service/',
    AUTH_SERVICE: 'auth-service/anonymous/',
    FILE_UPLOAD: 'fileHandler/',
    DEMO_GRAPHIC_SERVICE: 'demographic-service/ResidentEnrolment/',
    DEMO_GRAPHIC_UPDATE_SERVICE: 'demographic-service/UpdateAadharRecord/',
    ENROLLMENT_CENTER_SERVICE: 'upload-service/enrolmentCentre/',
    BOOKING_SERVICE: 'booking-service/',
    DEMO_GRAPHIC_SERVICE_QRCODE: 'demographic-service/QRCode/',
    
    //http://localhost:9030/demographic-service/UpdateAadharRecord/getDetailsByLoggedInMobile?loggedInMobile=9674592345
    //http://10.8.2.101:9030/demographic-service/UpdateAadharRecord/getLastUpdatedRecordsByAadhaar?aadhaarId=12345678
    //http://localhost:9060/demographic-service/UpdateAadharRecord/getLastUpdatedRecordsByType?aadhaarId=121333
    /*  Apis are made as constants and are loaded to the services,
        import the constant file into the services and then call it like -
        For API calls - APPPOINTEMENT.BASE_URL + APPPOINTEMENT.USER + APPPOINTEMENT.APIS.LOGIN
        For messages - APPPOINTEMENT.MESSAGES.USERNAME_REQUIRED
        For constants - APPPOINTEMENT.CONSTANTS.CONSTANTS_NAME
    */
    APIS: {
        AUTH: 'auth',
        GET_TOKEN: 'getToken',
        VALIDATE_TOKEN: 'validateToken',
        CAPTCHA: 'getCaptcha',
        VALIDATE_CAPTCHA: 'validateCaptcha',
        IMAGE_UPLOAD: 'uploadFile',
        CREATE_RESIDENT_ENROLMENT: 'createResidentEnrolment',
        GET_ENROL_BY_MOBILE: 'getResidentEnrolmentByMobile',
        GET_RESID_BY_ID: 'getResidentEnrolmentDetailsById',
        UPDATE_RESID_BY_ID: 'updateResidentEnrolment',
        GET_ENROL_BY_APP_ID: 'getResidentEnrolmentByAppointmentId',
        GET_ENROLL_BY_LOGGED_MOBILE: 'getResidentEnrolmentByLoggedInMobile',
        UPDATE_AADHARR_RECORD: 'updateResidentRecord',
        GET_ENROLMENT_CENTER: 'getEnrolmentCentre',
        GET_SLOTS_BY_DATE: 'getSlotsByDateAndEC',
        SLOT_BOOKING: 'bookSlot',
        GET_VILLAGES_BY_PINCODE: 'getVillagesByPinCode',
        GET_SUB_DIST_BY_CODE: 'getSubdistrictBySubDistrictCode',
        GET_DIST_BY_CODE: 'getDistrictByDistrictCode',
        GET_STATE_BY_CODE: 'getStateByStateCode',
        GET_UPDATE_PREVIEW:'getLastUpdatedRecordsByAadhaar',
        GET_AADHAAR_UPDATE_RECORDS: 'getDetailsByLoggedInMobile',
        UPDATE_REVIEW_AADHAAR_RECORDS: 'modifyUpdateRecords',
        RESCHEDULE_SLOT: 'rescheduleBookedSlot',
        CANCEL_SLOT: 'cancelBookedSlot',
        GET_BOOKING_SLOT_BY_APPOINTMENT_ID: 'getBookedSlotByAppointmentId',
        GET_ALL_STATE_DETAILS: 'getAllStates',
        GET_DISTRICT_BY_STATE_CODE: 'getDistrictsByStateCode',
        GET_SUB_DIST_BY_DISTRICT_CODE: 'getSubDistrictByDistrictCode',
        GET_VTC_BY_SUB_DIST_CODE: 'getVtcBysubDistrictCode',
        SEARCH_ENROLMENT_CENTER: 'searchEnrolmentCenter',
        QRCODE_UPDATE_FORM: 'updateform',
        QRCODE_NEW_FORM: 'enrolmentform',
        GENERATE_GENERIC_OTP: 'generateGenericOTP',
        VALIDATE_GENERIC_OTP: 'validateGenericOTP'
    },


    CONSTANTS: {
    },


    ROUTERLINKS: {
        ROOT: '',
        LOGIN: 'login',
        DASHBOARD: 'dashboard',
        TYPE_OF_ENROLLMENT: 'type-of-enrollment',
        NEW_ENROLLMENT: 'new-enrollment',
        BASIC_ENROLLMENT: 'basic-enrollment',
        DOCUMENT_ENROLLMENT: 'doc-enrollment',
        ADDRESS_ENROLLMENT: 'address-enrollment/',
        HEAD_OF_FAMILY_ENROLL: 'hof-enrollment',
        DOCUMENT_BASED_ENROLLMENT: 'doc-base-enrollment',
        PHOTO_UPLOAD: 'photo-upload',
        REVIEW_ENROLLMENT: 'review-enrollment',
        SUBMISSION_ENROLMENT: 'submisison-enrollment/',
        CHOOSE_UPDATE: 'choose-update',
        UPDATE_ENROLMENT:'update-enrolment',
        SEARCH_ENROLMENT_CENTER: 'search-center',
        SLOT_BOOKING: 'slot-booking/',
        CONFIRM_BOOKING: 'confirm-booking',
        ACKNOWLEDGEMENT: 'acknowledgement',
        UPDATE_REVIEW:'update-review'
    },

    URL: {
    },

    VALIDATOR_MESSAGES: {
    },

    MESSAGES: {
        MOBILE_NO_REQUIRED: 'Mobile Number is required',
        CAPTCHA_NOT_MATCHED: 'Captcha is not matched',
        EMAIL_REQUIRED: 'Email is required',
        VALID_EMAIL: 'Valid email is required',
        FULL_NAME: 'Full name is required',
        FIRST_NAME_REQUIRED: 'First Name is required',
        LAST_NAME_REQUIRED: 'Last Name is required',
        DOB_REQUIRED: 'Date of Birth is required',
        AGE_REQUIRED: 'Age is required',
        GENDER_REQUIRED: 'Gender is required',
        HOUSE_NO: 'House/Bldg./Apt No./or Name is required',
        ADDRESS_LINE1: 'Address Line 1 is required',
        ADDRESS_LINE2: 'Address Line 2 is required',
        VILLAGE: 'Village is required',
        SUB_DISTRICT: 'Sub District is required',
        DISTRICT: 'District is required',
        CITY: 'City is required',
        STATE: 'State is required',
        ZIP_CODE: 'Zip code is required',
        WRONG_CODE: 'You have entered the wrong security code!',
        CAPTCHA_REQ: 'Security code is required',
        ADDRESS_REQUIRED: 'Address is required',
        AADHAR_NUMBER: 'Aadhaar number is required',
        WRONG_OTP: 'You have entered the wrong OTP!'
    }
};


