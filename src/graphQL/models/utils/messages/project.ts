enum ErrorForProject {
  NOT_FOUND = 'The requested project does not exists',
  NOTHING_TO_DELETE = 'There is no project to be deleted'
}

enum MessageForProject {
  ALL_AREAS_DELETED = 'All the projects were deleted successfully',
  AREA_DELETED = 'The requested project was successfully deleted'
}

export { ErrorForProject as EFP, MessageForProject as MFP }
