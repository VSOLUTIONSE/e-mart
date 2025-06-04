import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash, Plus, Package } from 'lucide-react';
import { useStore } from '@/providers/store-provider';
import { useToast } from '@/hooks/use-toast';
import { Category } from '@/types/category';

export function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const { toast } = useToast();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    const categoryData: Omit<Category, 'id'> = {
      name: formData.name.trim(),
      description: formData.description.trim()
    };

    if (editingId) {
      updateCategory(editingId, categoryData);
      toast({
        title: "Category Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      addCategory(categoryData as Category);
      toast({
        title: "Category Added",
        description: `${formData.name} has been added successfully.`,
      });
    }
    
    resetForm();
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description
    });
    setEditingId(category.id);
    setIsAdding(true);
  };

  const handleDelete = (categoryId: string, categoryName: string) => {
    if (confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      deleteCategory(categoryId);
      toast({
        title: "Category Deleted",
        description: `${categoryName} has been removed.`,
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? 'Edit Category' : 'Add New Category'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter category description"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  {editingId ? 'Update Category' : 'Add Category'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {categories.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Categories Yet</h3>
            <p className="text-muted-foreground">
              Add your first category to organize your products.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category.id, category.name)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}