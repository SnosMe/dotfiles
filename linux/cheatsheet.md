# Disks

```bash
# Usage
df -h

# List block devices (=all disks).
lsblk --paths
lsblk --fs
lsblk --topology

# Check partitioning (GPT) on a specific disk.
fdisk -l /dev/sdX

# TUI
cfdisk
```
