import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ProjectPreview from './preview-templates/ProjectPreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('project', ProjectPreview)
CMS.registerPreviewTemplate('graphic', ProjectPreview)
CMS.registerPreviewTemplate('illustration', ProjectPreview)
