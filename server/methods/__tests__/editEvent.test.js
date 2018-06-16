import { constructNewDocument } from '../events/editEvent'

describe('editEvent method', () => {
  test('constructNewDocumnt rules', () => {
    const model = {
      _id: '#1',
      createdAt: 'new-date',
      engagement: {
        limit: 1,
        attendees: ['#1']
      },
      organiser: '#1'
    }

    const prevDoc = {
      _id: '#2',
      createdAt: 'prev-date',
      engagement: {
        limit: 2,
        attendees: ['#2']
      },
      organiser: '#2'
    }

    expect(constructNewDocument(model, prevDoc)).toMatchObject({
      _id: prevDoc._id,
      createdAt: prevDoc.createdAt,
      engagement: {
        limit: model.engagement.limit,
        attendees: prevDoc.engagement.attendees
      },
      organiser: '#2'
    })
  })
})
