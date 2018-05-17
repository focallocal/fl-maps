import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const GeolocationHelpModal = ({ isOpen, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader>
      Geolocation Support
    </ModalHeader>
    <ModalBody>
      Todo -> Write this section!
    </ModalBody>
  </Modal>
)

export default GeolocationHelpModal
