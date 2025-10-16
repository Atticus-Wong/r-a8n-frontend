package main

import (
	"context"
	"fmt"

	routeoptimization "cloud.google.com/go/maps/routeoptimization/apiv1"
	"google.golang.org/genproto/googleapis/type/latlng"

	rpb "cloud.google.com/go/maps/routeoptimization/apiv1/routeoptimizationpb"
)

func optimizeTours(projectID string) (*rpb.OptimizeToursResponse, error) {
	ctx := context.Background()
	c, err := routeoptimization.NewClient(ctx)
	if err != nil {
		return nil, fmt.Errorf("routeoptimization client: %w", err)
	}
	defer c.Close()

	// See https://pkg.go.dev/cloud.google.com/go/maps/routeoptimization/apiv1/routeoptimizationpb#OptimizeToursRequest.
	req := &rpb.OptimizeToursRequest{
		Parent: "projects/" + projectID,
		Model: &rpb.ShipmentModel{
			Shipments: []*rpb.Shipment{
				&rpb.Shipment{
					Deliveries: []*rpb.Shipment_VisitRequest{
						{ArrivalLocation: &latlng.LatLng{Latitude: 48.880942, Longitude: 2.323866}},
					},
				},
			},
			Vehicles: []*rpb.Vehicle{
				{
					StartLocation: &latlng.LatLng{Latitude: 48.863102, Longitude: 2.341204},
					EndLocation:   &latlng.LatLng{Latitude: 48.86311, Longitude: 2.341205},
				},
			},
		},
	}
	return c.OptimizeTours(ctx, req)
}

