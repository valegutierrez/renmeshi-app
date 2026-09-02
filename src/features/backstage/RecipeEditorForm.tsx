import { useEffect, useState, type FormEvent } from 'react'
import type { RecipeCategory } from '../../models/recipe'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'

type RecipeEditorFormProps = { name: string; category: RecipeCategory; cookingTime: string; servings: string; ingredients: string; instructions: string; image?: File; editing: boolean; onChange: (field: string, value: string) => void; onImageChange: (image: File | undefined) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onCancel: () => void }

export function RecipeEditorForm({ name, category, cookingTime, servings, ingredients, instructions, image, editing, onChange, onImageChange, onSubmit, onCancel }: RecipeEditorFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>()
  useEffect(() => {
    if (!image) { setPreviewUrl(undefined); return }
    const url = URL.createObjectURL(image)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [image])
  return <Stack component="form" className="editor" spacing={2} onSubmit={onSubmit}>
    <TextField label="Recipe name" value={name} onChange={(event) => onChange('name', event.target.value)} required />
    <FormControl><InputLabel id="recipe-category-label">Recipe category</InputLabel><Select labelId="recipe-category-label" label="Recipe category" value={category} onChange={(event) => onChange('category', event.target.value)}>{(['Appetizers', 'Mains', 'Sides', 'Desserts'] as RecipeCategory[]).map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select></FormControl>
    <TextField label="Cooking time" value={cookingTime} onChange={(event) => onChange('cookingTime', event.target.value)} type="number" slotProps={{ htmlInput: { min: 1, step: 1 } }} required />
    <TextField label="Servings" value={servings} onChange={(event) => onChange('servings', event.target.value)} type="number" slotProps={{ htmlInput: { min: 0.1, step: 0.1 } }} required />
    <TextField label="Ingredients" value={ingredients} onChange={(event) => onChange('ingredients', event.target.value)} placeholder="Ingredients, one per line" multiline minRows={3} required />
    <TextField label="Instructions" value={instructions} onChange={(event) => onChange('instructions', event.target.value)} placeholder="Instructions, one per line" multiline minRows={3} required />
    <Button component="label" variant="outlined">{image ? image.name : editing ? 'Replace recipe image' : 'Choose recipe image'}<input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => onImageChange(event.target.files?.[0])} required={!editing} /></Button>
    {previewUrl && <img className="recipe-upload-preview" src={previewUrl} alt="Selected recipe preview" />}
    {image && <Typography color="text.secondary">Ready to upload: {image.name}</Typography>}
    <Button variant="contained" type="submit">{editing ? 'Update recipe' : 'Save recipe'}</Button>{editing && <Button variant="text" type="button" onClick={onCancel}>Cancel edit</Button>}
  </Stack>
}
