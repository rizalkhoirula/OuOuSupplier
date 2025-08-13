import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Add, Close, Edit, Delete } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// ---------- Styled Components ----------
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3, 4),
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ModernFileUpload = styled(Box)(({ theme, isDragging }) => ({
  border: `3px dashed ${
    isDragging ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: isDragging
    ? `${theme.palette.primary.light}10`
    : theme.palette.grey[50],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 0 15px ${theme.palette.primary.main}50`,
  },
}));

const GradientButton = styled(Button)(() => ({
  borderRadius: 12,
  padding: "8px 16px",
  background: "linear-gradient(135deg, #2196f3, #21cbf3)",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 4px 14px rgba(33, 150, 243, 0.4)",
  "&:hover": {
    background: "linear-gradient(135deg, #1e88e5, #00bcd4)",
    transform: "translateY(-1px)",
  },
}));

const GradientIconButton = styled(IconButton)(() => ({
  background: "linear-gradient(135deg, #2196f3, #21cbf3)",
  color: "#fff",
  padding: 6,
  "&:hover": {
    background: "linear-gradient(135deg, #1e88e5, #00bcd4)",
    transform: "scale(1.05)",
  },
}));

// ---------- Main Component ----------
export default function ProductDashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState([]);

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 25.0,
      description: "Short description",
      spec: "Spec details",
      photos: ["photo1.jpg"],
      color: "Red",
      category: "Electronics",
      rating: 4.5,
      numReviews: 12,
      stock: 12,
    },
    {
      id: 2,
      name: "Product 2",
      price: 45.5,
      description: "Another product description",
      spec: "Spec details",
      photos: ["photo2.jpg"],
      color: "Blue",
      category: "Clothing",
      rating: 4.0,
      numReviews: 8,
      stock: 8,
    },
  ];

  const handleOpenDialog = (isEdit = false) => {
    setEditMode(isEdit);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setImages([]);
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const columns = [
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "price", headerName: "Price ($)", flex: 0.5 },
    { field: "stock", headerName: "Stock", flex: 0.5 },
    { field: "rating", headerName: "Rating", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <GradientIconButton
            size="small"
            onClick={() => handleOpenDialog(true)}
          >
            <Edit fontSize="small" />
          </GradientIconButton>
          <GradientIconButton
            size="small"
            onClick={() => alert("Delete action")}
          >
            <Delete fontSize="small" />
          </GradientIconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Product Management
        </Typography>
        <GradientButton
          startIcon={<Add />}
          onClick={() => handleOpenDialog(false)}
        >
          Add Product
        </GradientButton>
      </Box>

      {/* DataGrid */}
      <DataGrid
        autoHeight
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar }}
        sx={{
          border: "none",
          borderRadius: 3,
          boxShadow: 4,
          "& .MuiDataGrid-columnHeaders": {
            background: "linear-gradient(135deg, #e3f2fd, #f0f7ff)",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f9fbff",
          },
        }}
      />

      {/* Add/Edit Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>
          {editMode ? "Edit Product" : "Add Product"}
          <IconButton onClick={handleCloseDialog} sx={{ color: "#fff" }}>
            <Close />
          </IconButton>
        </StyledDialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Product Name" fullWidth />
            <TextField label="Price" type="number" fullWidth />
            <TextField label="Description" multiline rows={3} fullWidth />
            <TextField label="Specification" fullWidth />
            <TextField label="Color" fullWidth />
            <TextField label="Category" fullWidth />
            <TextField label="Rating" type="number" fullWidth />
            <TextField label="Number of Reviews" type="number" fullWidth />
            <TextField label="Stock" type="number" fullWidth />

            {/* File Upload */}
            <ModernFileUpload
              isDragging={isDragging}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <Typography variant="body1" color="textSecondary">
                Drag & drop product images here, or click to upload
              </Typography>
              <input
                id="fileInput"
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </ModernFileUpload>

            {/* Image Previews */}
            {images.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 2,
                    }}
                  >
                    <img
                      src={img.preview}
                      alt={`preview-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteImage(index)}
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            <GradientButton fullWidth>
              {editMode ? "Save Changes" : "Add Product"}
            </GradientButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
