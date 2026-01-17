# Doctor Photos Directory

Place doctor profile photos in this directory.

## Required Files

Based on the seed data, you need the following images:

1. `doctor1.jpg` - For Dr. Ashok Kumar
2. `doctor2.jpg` - For Dr. Rajesh Kumar
3. `doctor3.jpg` - For Dr. Priya Mehta
4. `specialist.jpg` - For External Specialist

## File Paths

The images are referenced in the database with these paths:
- `/doctors/doctor1.jpg`
- `/doctors/doctor2.jpg`
- `/doctors/doctor3.jpg`
- `/doctors/specialist.jpg`

## How Next.js Serves Static Files

In Next.js, files in the `public` directory are served from the root URL path:
- `public/doctors/doctor1.jpg` → accessible at `/doctors/doctor1.jpg`
- No need to use `/public` in the URL path

## Image Recommendations

- **Format**: JPG or PNG
- **Size**: Recommended 400x400px or larger (square aspect ratio)
- **File size**: Keep under 200KB for better performance
- **Naming**: Use lowercase letters and hyphens for consistency

## Example

```
pet-clinic/
└── public/
    └── doctors/
        ├── doctor1.jpg
        ├── doctor2.jpg
        ├── doctor3.jpg
        └── specialist.jpg
```

If you don't have doctor photos yet, you can use placeholder images or leave them as `null` in the database (the UI will show a default icon).
