enum ErrorForMember {
  NOT_FOUND = 'The requested member does not exists',
  NOTHING_TO_DELETE = 'There is no member to be deleted'
}

enum MessageForMember {
  ALL_AREAS_DELETED = 'All the members were deleted successfully',
  AREA_DELETED = 'The requested member was successfully deleted'
}

export { ErrorForMember as EFM, MessageForMember as MFM }
