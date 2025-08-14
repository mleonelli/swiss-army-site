# Swiss Army Site

A comprehensive multi-tool web application featuring various utilities organized by categories and subcategories.

## Language Management

### Adding/Removing Languages

Languages are managed through separate files in the `src/locales/` directory. To enable or disable languages:

1. **Enable/Disable Languages**: Edit `src/locales/index.ts` and modify the `LANGUAGE_CONFIG` object:

```typescript
export const LANGUAGE_CONFIG = {
  en: { enabled: true, translations: en, name: 'English', flag: '🇺🇸' },
  es: { enabled: true, translations: es, name: 'Español', flag: '🇪🇸' },
  fr: { enabled: false, translations: fr, name: 'Français', flag: '🇫🇷' }, // Disabled
  de: { enabled: true, translations: de, name: 'Deutsch', flag: '🇩🇪' },
} as const;
```

2. **Add New Language**: 
   - Create a new file `src/locales/[language-code].ts`
   - Export translations object with all required keys
   - Import and add to `LANGUAGE_CONFIG` in `src/locales/index.ts`

3. **Remove Language**: 
   - Set `enabled: false` in `LANGUAGE_CONFIG`
   - Or remove the entry entirely and delete the language file

### Language File Structure

Each language file exports a translations object with nested keys:

```typescript
export const en = {
  'app.title': 'Swiss Army Site',
  'nav.textTools': 'Text Tools',
  // ... more translations
};
```

## Features

- **Text Tools**: Text processing and analysis utilities
- **Calculation Tools**: Mathematical calculators and converters
- **Financial Tools**: Pricing and investment calculators
- **Randomizer Tools**: Decision-making and generation tools
- **Health Tools**: Body metrics and fitness calculators

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
```

## Architecture

- **Modular Language System**: Each language in separate files
- **Easy Configuration**: Simple enable/disable in config file
- **Type Safety**: Full TypeScript support for translations
- **Responsive Design**: Works on all device sizes
- **Dark/Light Mode**: System preference detection with manual toggle