import React, { useEffect, useRef, useState } from 'react';

export const GoogleAddressInput = ({ onPlaceSelected }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      if (!window.google?.maps?.places?.PlaceAutocompleteElement) return;

      await window.google.maps.importLibrary('places');
      if (!containerRef.current) return;

      const elem = new window.google.maps.places.PlaceAutocompleteElement();
      elem.classList.add('autocomplete-input');

      // Force the input to field to use light theme.
      // This will be removed when we start working on dark mode.
      // TODO: Remove this line we start working on dark mode.
      elem.style.colorScheme = 'none';

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(elem);

      inputRef.current = elem.shadowRoot?.querySelector('input');

      elem.addEventListener('gmp-select', async (event) => {
        const prediction = event.placePrediction;
        const place = await prediction.toPlace();

        await place.fetchFields({
          fields: ['location', 'formattedAddress'],
        });

        const address = place.formattedAddress;
        const lat = typeof place.location?.lat === 'function' ? place.location.lat() : null;
        const lng = typeof place.location?.lng === 'function' ? place.location.lng() : null;

        if (typeof lat === 'number' && typeof lng === 'number') {
          setSelectedAddress(address);

          if (inputRef.current) {
            inputRef.current.value = address;
          }

          onPlaceSelected?.({
            name: address,
            location: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          });
        } else {
          console.warn('Invalid coordinates received from place', place);
        }
      });
    };

    init();
  }, [onPlaceSelected]);

  return (
    <div className="address-form">
      <label className="address-label">Enter Address</label>
      <div ref={containerRef} className="address-container" />

      {selectedAddress && (
        <p className="address-selected">Selected: {selectedAddress}</p>
      )}
    </div>
  );
};
