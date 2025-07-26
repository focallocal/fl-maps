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
      elem.style.border = '1px solid lightgray';
      elem.style.height = '43px';

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(elem);

      inputRef.current = elem.shadowRoot?.querySelector('input');

      containerRef.current.appendChild(elem);

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

          
            const autocompleteElement = containerRef.current.querySelector('gmpx-place-autocomplete');
            if (autocompleteElement) {
              autocompleteElement.value = address;
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
      <label htmlFor="google-address-input" className="address-label">Enter Address</label>
      <div id="google-address-input" ref={containerRef} className="address-container" />

      {selectedAddress && (
        <p className="address-selected"><strong className='address-selected-title'>Selected:</strong> {selectedAddress}</p>
      )}
    </div>
  );
};
