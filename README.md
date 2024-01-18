# Astral

Astral is a...  
3D and 2D versions  
3D and 2D differences  
To use with a DAW keep Astral open on the samedesktop.  
use with your DAW to:
- add some organic shifting to melodies
- sprinkle some random percussion
- use astral to power effects
- add new bodies using notes from your music
- Enhance ambient pads by creating a loose, ever-changing rhythm

## Options

### Orbit Speed

Select a maxium speed bodies can travel.  
Different speeds effect the elliptic orbit and the consistency of repeated notes.

### Mode

Select a key and diatonic mode for default and MIDI output. 
Default is C Lydian.

### Grid

Set the note grid to on, off or fade out over time.

### Display

**Col.:** Disable or enable transitional colour changes.

**Grav.:** Visualise the gravitational pull effecting each body.

**AOE:** Visualise the area of gravitational effect each body has.

**FPS:** Display Astral's frames per second.

### Idle Rotation/Zoom (3D only)

Disable or enable camera movement during inactivity.

### Collisions

Disable or enable the merging of bodies when they touch.

### Reset

Clears all bodies from the canvas.

### MIDI Options Button

Opens a new menu to access Astral's MIDI options.

## MIDI Options

These options only effect Astral's MIDI features and do nothing to change the global options.  
Refresh the page to update the list of available MIDI devices.  
To use Astral's MIDI features you must be using a browser compatible with The Web MIDI API.

### MIDI Mode

MIDI Mode turns off the default sounds and sends all notes to the selected MIDI output.  
MIDI Mode must be on for MIDI Options to take effect.

### Channels

By default Astral uses channels 1-8 based on the mass of the triggering body. Although you may wish to send all output to a single MIDI channel, if for example you want all bodies to trigger a single instrument, no matter their mass. All bodies can be set to fire on channel 1,2 or 3.

### Note Length

Adjust how long the notes are 'held down' in seconds.

### Transpose Octave

Useful when the MIDI software/hardware Astral is outputting to, doesn't feature the ability to transpose incoming notes.

### Output Device

Select an available MIDI device for Astral's output.

### Input Device

The MIDI input device can create new bodies. The new body's mass is defined by the note played by the input device and given a random starting position. This feature can be useful to automate the creation of bodies over time.
