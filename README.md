# ParkingLora

Smart parking management system based on LoRa communication and IoT architecture.

## Overview

ParkingLora was developed to address urban parking inefficiencies through low-power sensing and long-range communication. The platform combines sensor-driven occupancy detection, backend APIs, and a frontend dashboard/mobile interface.

This repository captures the full project structure built for the 2023 Internet of Things course.

## Problem Statement

Urban parking often suffers from:
- low visibility of available spots
- unnecessary traffic caused by spot searching
- poor utilization of parking resources

ParkingLora aims to provide near real-time parking visibility with scalable and cost-efficient infrastructure.

## Solution Architecture

- Device Layer: LoRa-enabled parking sensors
- Communication Layer: LoRa/LoRaWAN telemetry transport
- Backend Layer: API and data persistence services
- Application Layer: Dashboard and mobile/web user interfaces

## Key Features

- Parking slot occupancy monitoring
- Near real-time status updates
- API-based integration between sensors and UI
- Dashboard and app-oriented user flow
- Modular architecture for future expansion

## Technology Stack

- Languages: TypeScript, JavaScript, C/C++, Python
- Frontend: Angular/Ionic (project subfolder)
- Backend: Node.js/Express (project subfolder)
- Data: MongoDB
- IoT: LoRa/LoRaWAN, sensors, MQTT patterns

## Repository Structure

- `parking-app/`: frontend application
- `parking-app-backend/`: backend API and services

## Getting Started

Because this repository includes multiple components, setup depends on the specific subproject.

Recommended flow:
1. Open `parking-app/` and install frontend dependencies.
2. Open `parking-app-backend/` and install backend dependencies.
3. Configure environment variables for backend services.
4. Run backend first, then frontend.

## Use Cases

- University campus parking
- Private facilities with monitored spaces
- Pilot smart-city deployments

## Project Status

Academic project completed in 2023 for the Internet of Things course.

## Documentation and Governance

- License: see `LICENSE`
- Contribution process: see `CONTRIBUTING.md`
- Security reporting: see `SECURITY.md`
- Community rules: see `CODE_OF_CONDUCT.md`
- Changes history: see `CHANGELOG.md`
