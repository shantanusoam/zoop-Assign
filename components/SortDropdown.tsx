"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
        <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
        <SelectItem value="nameAZ">Name: A to Z</SelectItem>
        <SelectItem value="nameZA">Name: Z to A</SelectItem>
      </SelectContent>
    </Select>
  )
}

