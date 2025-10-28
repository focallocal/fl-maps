import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import Recurring from './DateTimeModule/Recurring'
// import WeekDays from './DateTimeModule/WeekDays'
import RadioButton from './RadioButton'
import SameDateHours from './SameDateHours'
import VideoEntry from './VideoEntry'

import i18n from '/imports/both/i18n/en'

let labels = i18n.NewEventModal

VideoButtons.propTypes = {
  videoLinksAdded: PropTypes.number.isRequired,
  addLink: PropTypes.func.isRequired,
  removeLink: PropTypes.func.isRequired
}

function VideoButtons({ videoLinksAdded, addLink, removeLink }) {
  return (
    <div className='video-buttons'>
      {videoLinksAdded < 3 && (
        <Button onClick={addLink}>Add Video</Button>
      )}
      &nbsp;
      {videoLinksAdded > 0 && (
        <Button color='danger' onClick={removeLink}>Remove Video</Button>
      )}
    </div>
  )
}

const SecondStep = ({ form, onChange, errors }) => {
  const [videoLinksAdded, setVideoLinksAdded] = useState(0)
  const [openEndDate, setOpenEndDate] = useState()

  const formData = form?.getModel?.() || {}
  const { days, multipleDays, repeat } = formData.when || {}

  const [attendeeLimit, setAttendeeLimit] = useState(() => formData.engagement?.limit || '');

  const toggleLinks = () => {
    if (videoLinksAdded === 0) {
      setVideoLinksAdded(1)
    } else {
      setVideoLinksAdded(0)
    }
  }

  const addLink = () => {
    if (videoLinksAdded < 3) {
      setVideoLinksAdded(videoLinksAdded + 1)
    }
  }

  const removeLink = () => {
    if (videoLinksAdded > 0) {
      setVideoLinksAdded(videoLinksAdded - 1)
    }
  }

  const resetEndDate = () => {
    setOpenEndDate(false)
  }

  return (
    <div id='second-step'>
      <div className='mb-3'>
        <FormGroup noMargin={true}>
          <Label for="findHints">Find Hints</Label>
          <Input
            type="text"
            name="findHints"
            id="findHints"
            value={formData.findHints || ''}
            onChange={(e) => form?.change?.('findHints', e.target.value)}
          />
        </FormGroup>
        {errors?.findHints && (!formData?.findHints || formData.findHints.trim() === '') && (
          <div className="text-danger">{errors.findHints}</div>
        )}
      </div>

      <div className='dates-hours inline-inputs hide-labels'>
        <div>
          <Row>
            <Col className='date-hours-coupled'>
              <FormGroup>
                <Label for="startingDate">Starting Date</Label>
                <Input
                  type="date"
                  name="startingDate"
                  id="startingDate"
                  value={formData.when.startingDate || ''}
                  onChange={(e) => {
                    const when = formData.when || {}
                    form.change('when', { ...when, startingDate: e.target.value })
                  }}
                />
              </FormGroup>
              {!multipleDays && (
                <FormGroup>
                  <Label for="startingTime">Starting Time</Label>
                  <Input
                    type="time"
                    name="startingTime"
                    id="startingTime"
                    value={formData.when.startingTime || ''}
                    onChange={(e) => {
                      const when = formData.when || {}
                      form.change('when', { ...when, startingTime: e.target.value })
                    }}
                  />
                </FormGroup>
              )}
            </Col>
            <Col className='date-hours-coupled'>
              {(!repeat && !openEndDate) && (
                <FormGroup>
                  <Label for="endingDate">Ending Date</Label>
                  <Input
                    type="date"
                    name="endingDate"
                    id="endingDate"
                    value={formData.when.endingDate || ''}
                    onChange={(e) => {
                      const when = form.getModel().when || {};
                      form.change('when', {
                        ...when,
                        endingDate: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              )}
              {(!multipleDays && !openEndDate) && (
                <FormGroup>
                  <Label for="endingTime">Ending Time</Label>
                  <Input
                    type="time"
                    name="endingTime"
                    id="endingTime"
                    value={formData.when?.endingTime || ''}
                    onChange={(e) => {
                      const when = formData.when || {}
                      form.change('when', { ...when, endingTime: e.target.value })
                    }}
                  />
                </FormGroup>
              )}
              {(!repeat && openEndDate) && (
                <FormGroup>
                  <Label for="endingDate">Ending Date</Label>
                  <Input
                    type="date"
                    name="endingDate"
                    id="endingDate"
                    value={formData.when.endingDate || ''}
                    onChange={(e) => {
                      const when = form.getModel().when || {};
                      form.change('when', {
                        ...when,
                        endingDate: e.target.value,
                      });
                    }}
                    onClick={resetEndDate}
                  />
                </FormGroup>
              )}
            </Col>
          </Row>
        </div>
      </div>

      {RadioButton && (
        <RadioButton
          id='multipleDays'
          label={labels.recurrence.thirdRadio}
          value={multipleDays}
          type='radio'
          onRadioButtonClick={() => {
            const when = { ...formData.when, multipleDays: !multipleDays, repeat: false };
            form.change('when', when);
          }}
        />
      )}
      {multipleDays && (
        <div className='week-days'>
          <SameDateHours
            form={form}
            schemaKey={'when.days'}
          />
          <FormGroup>
            <Label>Select Weekdays</Label>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <FormGroup check inline key={index}>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={days?.includes(day)}
                    onChange={() => {
                      const updatedDays = days?.includes(day)
                        ? days.filter(d => d !== day)
                        : [...(days || []), day];
                      form.change('when.days', updatedDays);
                    }}
                  />{' '}
                  {day}
                </Label>
              </FormGroup>
            ))}
          </FormGroup>
        </div>
      )}

      <RadioButton
        id='repeat'
        label={labels.recurrence.fourthRadio}
        value={repeat}
        type='radio'
        onRadioButtonClick={() => {
          const when = { ...formData.when, repeat: !repeat, multipleDays: false };
          form.change('when', when);
        }}
      />

      {repeat && <Recurring form={form} />}

      {/*
      {repeat && (
        <FormGroup>
          <Label for="recurringDetails">Recurring Details</Label>
          <Input
            type="text"
            name="recurringDetails"
            id="recurringDetails"
            value={formData.when?.recurringDetails || ''}
            onChange={(e) => form.change('when.recurringDetails', e.target.value)}
          />
        </FormGroup>
      )}
      */}

      <div className="mb-3">
        <FormGroup noMargin={true}>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={formData.description || ''}
            onChange={(e) => {
              const value = e.target.value
              form.change('description', value)

              // Clear error if length >= 10
              if (errors?.description && value.trim().length >= 10) {
                form.change('errors.description', null)
              }
            }}
            minLength={20}
            maxLength={1000}
          />
        </FormGroup>

        <div className="text-muted small">
          {formData.description?.length || 0} / 1000
        </div>

        {errors?.description && (!formData?.description || formData.description.trim().length < 20) && (
          <div className="text-danger">{errors.description}</div>
        )}
      </div>

      <FormGroup>
        <Label for="engagement-limit">Attendee Limit</Label>
        <Input
          type="number"
          name="engagement.limit"
          id="engagement-limit"
          value={attendeeLimit}
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value, 10) || 0);
            setAttendeeLimit(value);
            form.change('engagement', { ...formData.engagement, limit: value });
          }}
        />
      </FormGroup>

      <FormGroup>
        <RadioButton
          id="includesVideo"
          label={`${labels.video.title.firstLine} ${labels.video.title.secondLine}`}
          value={videoLinksAdded > 0}
          type="radio"
          onRadioButtonClick={(id, value) => {
            if (value && videoLinksAdded === 0) {
              setVideoLinksAdded(1)
            } else if (!value && videoLinksAdded > 0) {
              setVideoLinksAdded(0)
            }
          }}
        />
      </FormGroup>
      <div className="video-section">
        <FormGroup>
          {videoLinksAdded > 0 && <VideoEntry id={1} form={form} />}
          {videoLinksAdded > 1 && <VideoEntry id={2} form={form} />}
          {videoLinksAdded > 2 && <VideoEntry id={3} form={form} />}
          {videoLinksAdded > 0 && (
            <VideoButtons
              videoLinksAdded={videoLinksAdded}
              addLink={addLink}
              removeLink={removeLink}
            />
          )}
        </FormGroup>
      </div>
    </div>
  )
}

SecondStep.propTypes = {
  form: PropTypes.object
}

export default SecondStep
