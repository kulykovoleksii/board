# UI Components

Reusable React components for the application.

## Installation

Import components from `@/Components`:

```jsx
import { Button, Input, Card } from '../../Components';
```

## Components

### Button

Versatile button component with variants and loading state.

```jsx
<Button variant="primary" loading={processing}>
    Save
</Button>

<Button variant="danger" onClick={handleDelete}>
    Delete
</Button>

<Button href="/back" variant="secondary">
    Cancel
</Button>
```

**Props:**
- `type` - button type (default: 'button')
- `variant` - 'primary', 'secondary', 'danger', 'success' (default: 'primary')
- `size` - 'sm', 'md', 'lg' (default: 'md')
- `loading` - shows spinner and disables button
- `disabled` - disables button
- `href` - if provided, renders as Inertia Link

### Input

Text input with label and error support.

```jsx
<Input
    label="Email"
    type="email"
    value={data.email}
    onChange={(e) => setData('email', e.target.value)}
    error={errors.email}
    required
/>
```

**Props:**
- `label` - input label
- `error` - error message
- `required` - shows asterisk in label
- All standard input props (type, value, onChange, etc.)

### Textarea

Textarea with label and error support.

```jsx
<Textarea
    label="Description"
    rows={10}
    value={data.description}
    onChange={(e) => setData('description', e.target.value)}
    error={errors.description}
/>
```

### Select

Select dropdown with label and error support.

```jsx
<Select
    label="Category"
    value={data.category}
    onChange={(e) => setData('category', e.target.value)}
    error={errors.category}
    placeholder="Choose category"
    options={[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
    ]}
/>
```

Or with children:

```jsx
<Select label="Status" value={data.status}>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
</Select>
```

### Badge

Status badge with color variants.

```jsx
<Badge variant="blue">Active</Badge>
<Badge variant="gray">Draft</Badge>
<Badge variant="red">Rejected</Badge>
```

**Variants:** gray, blue, green, yellow, red, purple

### Card

Container card with optional title.

```jsx
<Card title="User Information">
    <Input label="Name" />
    <Input label="Email" />
</Card>

<Card>
    <p>Content without title</p>
</Card>
```

### Spinner

Loading spinner.

```jsx
<Spinner size="md" />
<Spinner size="lg" className="text-blue-600" />
```

### Alert

Alert box for messages.

```jsx
<Alert variant="warning" title="Important">
    Please review before submitting.
</Alert>

<Alert variant="danger">
    An error occurred.
</Alert>
```

**Variants:** info, success, warning, danger

### PageHeader

Page header with back button and title.

```jsx
<PageHeader
    title="Edit User"
    subtitle="Update user information"
    backHref="/admin/users"
/>
```

### BackButton

Back navigation button.

```jsx
<BackButton href="/admin/users" />
```

## Example Migration

**Before:**
```jsx
<div className="bg-white rounded-lg shadow-sm p-6">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email <span className="text-red-500">*</span>
    </label>
    <input
        type="email"
        id="email"
        value={data.email}
        onChange={(e) => setData('email', e.target.value)}
        className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        }`}
        required
    />
    {errors.email && (
        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
    )}
</div>
```

**After:**
```jsx
<Card>
    <Input
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData('email', e.target.value)}
        error={errors.email}
        required
    />
</Card>
```
