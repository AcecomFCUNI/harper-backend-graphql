enum ErrorForArea {
  NOT_FOUND = 'The requested area does not exists',
  NOTHING_TO_DELETE = 'There is no area to be deleted'
}

enum MessageForArea {
  ALL_AREAS_DELETED = 'All the areas were deleted successfully',
  AREA_DELETED = 'The requested area was successfully deleted'
}

export { ErrorForArea as EFA, MessageForArea as MFA }
