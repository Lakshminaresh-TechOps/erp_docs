---
title: "Multi-Warehouse Stock Tracking & Inventory Management"
description: "How to manage product catalogs, track stock across multiple branches or godowns, and set low-stock reorder points."
author: "VAP ERP Team"
publishedAt: "2026-09-07"
updatedAt: "2026-09-08"
status: "published"
category: "Inventory"
module: "inventory"
audience: "inventory_manager"
tags: ["Inventory", "Stock", "Warehouse", "Reorders"]
---

# Multi-Warehouse Stock Tracking & Inventory Management

The **Inventory & Stock** module in VAP ERP helps trading companies, retail distributors, and light manufacturers maintain an accurate, real-time count of products across multiple locations, preventing expensive stockouts and over-ordering.

---

## 1. Setting Up Products & Items

1. Open the **App Launcher** and select **Inventory**.
2. Click **Items** from the left navigation and select **+ New Item**.
3. **General Information:**
   - **Item Name & SKU:** Enter the human-readable product title and your unique stock keeping unit (SKU) code or barcode.
   - **Category:** Group items (e.g. *Raw Materials*, *Finished Goods*, *Consumables*).
   - **Unit of Measurement (UOM):** Choose how stock is counted (e.g. *Pieces*, *Kilograms*, *Boxes*, *Meters*).
4. **Pricing & Costing:**
   - **Purchase Cost:** Default cost paid to suppliers.
   - **Selling Price:** Standard retail or wholesale price.
   - **Default Tax Rate:** Standard applicable GST or sales tax percentage.
5. **Stock Thresholds:**
   - **Reorder Level:** Minimum stock quantity that triggers an automated warning when inventory runs low.
6. Click **Save Item**.

---

## 2. Managing Multiple Warehouses & Locations

If your business operates multiple branches, retail stores, or godowns:
1. Navigate to **Inventory → Warehouses**.
2. Click **+ Add Warehouse** to create distinct locations (e.g. *Main Godown Mumbai*, *Bhiwandi Hub*, *Retail Counter 1*).
3. When viewing any product in your catalog, VAP ERP displays:
   - **Total Available Stock:** Across your entire business.
   - **Per-Warehouse Breakdown:** Exact stock quantities available at each physical location.

---

## 3. Stock In, Stock Out & Internal Transfers

Every physical inventory movement is recorded in an immutable ledger:

- **Stock In (Receiving Goods):**  
  When a supplier shipment arrives, go to **Inventory → Stock Adjustments → Add Stock In**. Enter the vendor name, destination warehouse, item quantities, and batch or lot numbers.
- **Stock Out (Dispatches & Sales):**  
  When an invoice is issued in the Finance module, inventory is automatically deducted from the designated warehouse. You can also log manual deductions for damaged goods or internal usage.
- **Internal Stock Transfer:**  
  To transfer stock from your central warehouse to a retail branch, go to **Inventory → Transfers → New Transfer**. Specify the source and destination warehouses, select the items, and click **Initiate Dispatch**. Once the receiving manager confirms delivery, the stock balances update in both locations.

---

## 4. Automated Low-Stock Alerts

Never miss a sales opportunity due to unmonitored stockouts:
- Navigate to **Inventory → Reorder Alerts** to view a filtered list of all items currently below their designated safety thresholds.
- From this screen, you can generate a **Purchase Requisition** in one click to notify your purchasing manager or supplier.
