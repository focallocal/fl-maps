import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const GeolocationHelpModal = ({ isOpen, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader>
      Geolocation Support
    </ModalHeader>
    <ModalBody>
      <p>For some reason we could not get your location..</p>

      <br />
      <em>(TODO - provide solutions to common issues related to our location service)</em>
    </ModalBody>
  </Modal>
)

export default GeolocationHelpModal
